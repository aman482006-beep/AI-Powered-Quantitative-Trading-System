"""Backtest metric conventions: periodic return annualisation, zero risk-free rate."""
import numpy as np
import pandas as pd

def performance(result, periods_per_year=252):
    e=result["equity"]; t=result["trades"]; rets=e["Returns"].dropna()
    if e.empty: raise ValueError("Empty equity curve.")
    years=max((e.index[-1]-e.index[0]).days/365.25, 1e-9)
    mean=rets.mean(); std=rets.std(ddof=1); downside=np.sqrt(np.mean(np.minimum(rets.to_numpy(),0)**2))
    pnl=t["pnl"] if not t.empty else pd.Series(dtype=float); wins=pnl[pnl>0]; losses=pnl[pnl<0]
    total=e.Equity.iloc[-1]/result["initial_capital"]-1
    return {"total_return":float(total),"cagr":float((1+total)**(1/years)-1) if total>-1 else -1.0,"annualised_volatility":float(std*np.sqrt(periods_per_year)),"sharpe":float(mean/std*np.sqrt(periods_per_year)) if std else 0.0,"sortino":float(mean/downside*np.sqrt(periods_per_year)) if downside else 0.0,"max_drawdown":float(e.Drawdown.min()),"win_rate":float((pnl>0).mean()) if len(pnl) else 0.0,"profit_factor":float(wins.sum()/abs(losses.sum())) if losses.sum() else (float("inf") if wins.sum() else 0.0),"number_of_trades":int(len(t)),"average_holding_days":float(np.mean([(pd.Timestamp(x)-pd.Timestamp(y)).days for y,x in zip(t.entry_date,t.exit_date)])) if len(t) else 0.0,"average_profit_per_trade":float(wins.mean()) if len(wins) else 0.0,"average_loss_per_trade":float(losses.mean()) if len(losses) else 0.0}
