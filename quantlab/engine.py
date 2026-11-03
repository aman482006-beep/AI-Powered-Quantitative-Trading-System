"""Long-only daily-bar simulator with next-open orders and conservative stop handling."""
from __future__ import annotations
import numpy as np
import pandas as pd
from .indicators import sma, ema, rsi, macd, bollinger

def build_signals(data: pd.DataFrame, strategy: str, params: dict):
    close = data["Close"]; entry = pd.Series(False, index=data.index); exit_ = entry.copy()
    if strategy in ("sma", "ema"):
        fn = sma if strategy == "sma" else ema
        fast, slow = fn(close, params.get("fast", 20)), fn(close, params.get("slow", 50))
        entry = (fast > slow) & (fast.shift() <= slow.shift())
        exit_ = (fast < slow) & (fast.shift() >= slow.shift())
    elif strategy == "rsi":
        x = rsi(close, params.get("period", 14)); low, high = params.get("oversold", 30), params.get("overbought", 70)
        entry = (x > low) & (x.shift() <= low); exit_ = (x < high) & (x.shift() >= high)
    elif strategy == "macd":
        m = macd(close, params.get("fast", 12), params.get("slow", 26), params.get("signal", 9))
        entry = (m.MACD > m.Signal) & (m.MACD.shift() <= m.Signal.shift())
        exit_ = (m.MACD < m.Signal) & (m.MACD.shift() >= m.Signal.shift())
    elif strategy == "bb":
        b = bollinger(close, params.get("period", 20), params.get("std", 2))
        entry = (close > b.Lower) & (close.shift() <= b.Lower.shift()); exit_ = close >= b.Middle
    elif strategy == "momentum":
        p = params.get("period", 20); prior_high = data.High.shift(1).rolling(p).max(); ma = sma(close, p)
        entry = (close > prior_high) & (close.shift() <= prior_high); exit_ = close < ma
    else:
        raise ValueError(f"Unknown strategy: {strategy}")
    return entry.fillna(False), exit_.fillna(False)

def backtest(data: pd.DataFrame, strategy="sma", params=None, initial_capital=100000.0, position_size=1.0, commission=0.001, slippage=0.0005, stop_loss=0.0, take_profit=0.0):
    d = data.copy(); params = params or {}
    if len(d) < 3: raise ValueError("At least three bars are required.")
    if initial_capital <= 0 or not 0 < position_size <= 1: raise ValueError("Invalid capital or position size.")
    entries, exits = build_signals(d, strategy, params)
    cash=float(initial_capital); qty=0.0; pos=None; pending=None; equity=[]; trades=[]
    for i, (date, row) in enumerate(d.iterrows()):
        if pos is not None:
            reason=None; price=None
            if stop_loss and row.Low <= pos["entry"]*(1-stop_loss): reason="stop-loss"; price=pos["entry"]*(1-stop_loss)
            elif take_profit and row.High >= pos["entry"]*(1+take_profit): reason="take-profit"; price=pos["entry"]*(1+take_profit)
            elif pending == "exit" and i > pos["index"]: reason="signal"; price=row.Open*(1-slippage)
            if reason:
                fee=qty*price*commission; cash += qty*price-fee
                pnl=(price-pos["entry"])*qty-pos["entry_fee"]-fee
                trades.append({"entry_date":pos["date"],"exit_date":date,"entry":pos["entry"],"exit":price,"quantity":qty,"pnl":pnl,"return":pnl/(pos["entry"]*qty+pos["entry_fee"]),"reason":reason})
                qty=0; pos=None; pending=None
        if pos is None and pending == "entry" and i > 0:
            price=row.Open*(1+slippage); qty=np.floor(cash*position_size/(price*(1+commission))*1e6)/1e6
            fee=qty*price*commission; cash -= qty*price+fee
            if qty > 0: pos={"entry":price,"date":date,"index":i,"entry_fee":fee}
            pending=None
        equity.append(cash+qty*row.Close)
        if pos is None and entries.iloc[i] and i < len(d)-1: pending="entry"
        elif pos is not None and exits.iloc[i] and i < len(d)-1: pending="exit"
    if pos is not None:
        date=d.index[-1]; price=d.iloc[-1].Close*(1-slippage); fee=qty*price*commission; cash+=qty*price-fee
        pnl=(price-pos["entry"])*qty-pos["entry_fee"]-fee
        trades.append({"entry_date":pos["date"],"exit_date":date,"entry":pos["entry"],"exit":price,"quantity":qty,"pnl":pnl,"return":pnl/(pos["entry"]*qty+pos["entry_fee"]),"reason":"end-of-test"})
        equity[-1]=cash
    result=pd.DataFrame({"Equity":equity},index=d.index); result["Returns"]=result.Equity.pct_change().fillna(0)
    result["Peak"]=result.Equity.cummax(); result["Drawdown"]=result.Equity/result.Peak-1
    return {"equity":result,"trades":pd.DataFrame(trades),"signals":pd.DataFrame({"Entry":entries,"Exit":exits}),"initial_capital":initial_capital}
