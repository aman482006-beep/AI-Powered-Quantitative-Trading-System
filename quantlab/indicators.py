"""Vectorised technical indicators implemented with pandas/numpy."""
import numpy as np
import pandas as pd

def sma(s: pd.Series, period: int) -> pd.Series:
    return s.rolling(period, min_periods=period).mean()

def ema(s: pd.Series, period: int) -> pd.Series:
    return s.ewm(span=period, adjust=False, min_periods=period).mean()

def rsi(s: pd.Series, period: int = 14) -> pd.Series:
    delta = s.diff(); up = delta.clip(lower=0); down = -delta.clip(upper=0)
    avg_up = up.ewm(alpha=1/period, adjust=False, min_periods=period).mean()
    avg_down = down.ewm(alpha=1/period, adjust=False, min_periods=period).mean()
    rs = avg_up / avg_down.replace(0, np.nan)
    result = 100 - 100 / (1 + rs)
    return result.mask(avg_down.eq(0), 100)

def macd(s: pd.Series, fast: int = 12, slow: int = 26, signal: int = 9):
    line = ema(s, fast) - ema(s, slow); sig = line.ewm(span=signal, adjust=False, min_periods=signal).mean()
    return pd.DataFrame({"MACD": line, "Signal": sig, "Histogram": line - sig})

def bollinger(s: pd.Series, period: int = 20, deviations: float = 2):
    mid = sma(s, period); std = s.rolling(period, min_periods=period).std(ddof=0)
    return pd.DataFrame({"Middle": mid, "Upper": mid + deviations*std, "Lower": mid - deviations*std})

def atr(data: pd.DataFrame, period: int = 14):
    prev = data["Close"].shift(1)
    tr = pd.concat([data["High"]-data["Low"], (data["High"]-prev).abs(), (data["Low"]-prev).abs()], axis=1).max(axis=1)
    return tr.ewm(alpha=1/period, adjust=False, min_periods=period).mean()

def adx(data: pd.DataFrame, period: int = 14):
    up = data["High"].diff(); down = -data["Low"].diff()
    plus_dm = up.where((up > down) & (up > 0), 0.0); minus_dm = down.where((down > up) & (down > 0), 0.0)
    a = atr(data, period)
    plus_di = 100 * plus_dm.ewm(alpha=1/period, adjust=False, min_periods=period).mean() / a
    minus_di = 100 * minus_dm.ewm(alpha=1/period, adjust=False, min_periods=period).mean() / a
    dx = 100 * (plus_di - minus_di).abs() / (plus_di + minus_di).replace(0, np.nan)
    return pd.DataFrame({"ADX": dx.ewm(alpha=1/period, adjust=False, min_periods=period).mean(), "+DI": plus_di, "-DI": minus_di})

def stochastic(data: pd.DataFrame, period: int = 14, smooth: int = 3):
    lo = data["Low"].rolling(period).min(); hi = data["High"].rolling(period).max()
    k = 100 * (data["Close"] - lo) / (hi - lo).replace(0, np.nan)
    return pd.DataFrame({"%K": k, "%D": k.rolling(smooth).mean()})

def roc(s: pd.Series, period: int = 12):
    return s.pct_change(periods=period) * 100

def obv(data: pd.DataFrame):
    direction = np.sign(data["Close"].diff()).fillna(0)
    return (direction * data["Volume"]).cumsum()
