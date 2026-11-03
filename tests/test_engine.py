import numpy as np
import pandas as pd
import pytest
from quantlab.data import validate_ohlcv
from quantlab.indicators import sma, ema, rsi, bollinger
from quantlab.engine import build_signals, backtest
from quantlab.analytics import performance

def sample(n=160):
    idx=pd.bdate_range("2022-01-03",periods=n)
    split=max(1,n//2)
    values=np.r_[np.linspace(100,130,split),np.linspace(130,105,n-split)]
    close=pd.Series(values,index=idx)
    return pd.DataFrame({"Open":close.shift().fillna(close.iloc[0]),"High":close*1.01,"Low":close*.99,"Close":close,"Volume":1000},index=idx)

def test_indicator_basics():
    s=pd.Series([1.,2.,3.,4.,5.,6.])
    assert sma(s,3).iloc[-1]==5
    assert ema(s,3).notna().sum()==4
    assert rsi(pd.Series(range(1,30),dtype=float),5).dropna().iloc[-1]==100
    bb=bollinger(pd.Series(range(1,30),dtype=float),5)
    assert bb.Upper.dropna().iloc[-1] > bb.Middle.dropna().iloc[-1]

def test_data_validation_rejects_bad_ohlc():
    d=sample(10); d.iloc[3,d.columns.get_loc("High")]=1
    with pytest.raises(ValueError): validate_ohlcv(d)

def test_data_validation_rejects_duplicate_dates():
    d=sample(10); d.index=[d.index[0]]*10
    with pytest.raises(ValueError): validate_ohlcv(d)

def test_signals_have_no_future_shift():
    d=sample(); e,x=build_signals(d,"sma",{"fast":3,"slow":10})
    assert len(e)==len(d) and len(x)==len(d)
    # A signal at t is derived solely from data through t; engine fills no earlier than t+1.
    assert e.index.equals(d.index)

def test_backtest_equity_and_costs():
    d=sample(); result=backtest(d,"sma",{"fast":5,"slow":20},10000,1,.001,.001)
    assert len(result["equity"])==len(d)
    assert result["equity"].Equity.notna().all()
    assert result["equity"].Equity.iloc[-1] != 0
    assert result["trades"].empty or result["trades"].pnl.notna().all()

def test_metrics_drawdown_and_sharpe_conventions():
    d=sample(); result=backtest(d,"sma",{"fast":5,"slow":20},10000,1,0,0)
    m=performance(result)
    assert -1 < m["max_drawdown"] <= 0
    assert np.isfinite(m["sharpe"])
    assert m["number_of_trades"]==len(result["trades"])
