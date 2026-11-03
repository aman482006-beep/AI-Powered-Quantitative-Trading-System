"""Historical market data retrieval and OHLCV validation."""
from __future__ import annotations
import pandas as pd

REQUIRED = ["Open", "High", "Low", "Close"]

def validate_ohlcv(frame: pd.DataFrame) -> pd.DataFrame:
    if frame is None or frame.empty:
        raise ValueError("No market observations supplied.")
    data = frame.copy()
    if isinstance(data.columns, pd.MultiIndex):
        data.columns = data.columns.get_level_values(0)
    data.columns = [str(c).strip().title().replace("Adjclose", "Adj Close") for c in data.columns]
    if "Date" in data.columns:
        data = data.set_index("Date")
    data.index = pd.to_datetime(data.index, errors="coerce").tz_localize(None)
    data = data.loc[~data.index.isna()].sort_index()
    if data.index.has_duplicates:
        raise ValueError("Duplicate timestamps found in OHLCV data.")
    missing = [c for c in REQUIRED if c not in data.columns]
    if missing:
        raise ValueError(f"Missing required OHLC columns: {missing}")
    for col in REQUIRED + (["Volume"] if "Volume" in data else []):
        data[col] = pd.to_numeric(data[col], errors="coerce")
    data = data.dropna(subset=REQUIRED)
    if (data[REQUIRED] <= 0).any().any():
        raise ValueError("OHLC prices must be positive.")
    bad = (data["High"] < data[["Open", "Close", "Low"]].max(axis=1)) | (data["Low"] > data[["Open", "Close", "High"]].min(axis=1))
    if bad.any():
        raise ValueError("Invalid OHLC range: High/Low does not contain Open and Close.")
    if "Volume" not in data:
        data["Volume"] = 0
    if "Adj Close" not in data:
        data["Adj Close"] = data["Close"]
    return data

def fetch_yahoo(ticker: str, start: str, end: str, interval: str = "1d") -> pd.DataFrame:
    """Download historical bars via yfinance; this is not a live data feed."""
    import yfinance as yf
    raw = yf.download(ticker, start=start, end=end, interval=interval, auto_adjust=False, progress=False)
    if raw is None or raw.empty:
        raise ValueError(f"No Yahoo Finance history returned for {ticker}.")
    return validate_ohlcv(raw)

def load_csv(file) -> pd.DataFrame:
    raw = pd.read_csv(file)
    raw.columns = [str(c).strip().title().replace("Adjclose", "Adj Close") for c in raw.columns]
    if "Date" not in raw.columns:
        raise ValueError("CSV must contain a Date column.")
    raw = raw.set_index("Date")
    return validate_ohlcv(raw)
