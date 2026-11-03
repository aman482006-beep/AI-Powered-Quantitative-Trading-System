# QuantLab — AI-Powered Quantitative Trading & Backtesting

QuantLab is a historical quantitative research and simulation platform. It provides a browser-based terminal that can be hosted on GitHub Pages and a Python/Streamlit research application for local or server deployment.

> **Research only.** No broker connection, live market feed or order execution is implemented. Historical results are not a forecast and are not investment advice.

## Deployment choices

| Version | Where it runs | What works |
|---|---|---|
| GitHub Pages | Static browser app in `index.html` | Historical provider fetch where browser CORS allows, CSV upload, indicators used by strategies, backtests, costs, stops/targets, metrics, charts, trade history, CSV/text exports, rule-based research assistant |
| Python / Streamlit | Your computer or a Python hosting service | Python data pipeline, pandas/NumPy research components and optional Gemini integration |

**Important:** GitHub Pages cannot run Python, Streamlit, SQLite, or server-side secrets. Pages serves static HTML/CSS/JavaScript only. The browser app is therefore self-contained and does not pretend to expose the Python backend.

## GitHub Pages setup

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main`, folder `/ (root)`, and save.
4. Wait for the Pages deployment check to finish. Open the published URL shown on the Pages settings screen.

The app opens with a synthetic demo series. The market-data workspace is India-only and includes the 100 Nifty 100 constituents (universe snapshot: 30 October 2026). Search or filter by sector, select companies, choose a date range, and use **Download all 100** or **Download selected** to fetch historical OHLCV bars into one Excel-friendly CSV. Choose exactly one company and use **Use one stock in backtest** to send it to the strategy terminal. The Nifty 100 list is a dated constituent snapshot and should be refreshed after index rebalances.

## Free historical data sources

- **Yahoo Finance chart endpoint via `proxy.cors.dev`**: free historical bars for many Indian `.NS` symbols without an API key. The browser relay is a third-party dependency and can be rate-limited or unavailable. The feed is unofficial and not an NSE-authorised data feed.
- **Nifty 100 universe**: 100 large-cap Indian companies across financials, IT, energy, healthcare, autos, consumer, industrials and other NSE sectors. The roster is a saved snapshot, not a live constituent synchronisation.
- **CSV upload**: deterministic fallback for any market when you have a correctly formatted OHLCV file.

When a browser blocks provider requests, that is a provider/network/CORS restriction rather than evidence that a symbol does not exist. Use CSV upload or the Python data path.

CSV required fields (case-insensitive): `Date, Open, High, Low, Close, Volume`. `Adj Close` is optional. Example:

```csv
Date,Open,High,Low,Close,Volume
2024-01-01,100,105,99,103,120000
2024-01-02,103,108,102,107,150000
```

## Local Python app

Python 3.10–3.12 recommended.

```bash
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
streamlit run streamlit_app.py
```

Optional LLM configuration: copy `.env.example` to `.env` and set `GEMINI_API_KEY`. Keep `.env` private; never put API keys in the GitHub Pages JavaScript bundle.

## Backtesting conventions

- Signals are computed from completed OHLCV bars.
- Market orders are filled at the **next bar open**, with configured slippage and commission.
- Stop-loss and take-profit checks use the subsequent bar's high/low. When both are touched in a single candle, stop-loss is assumed first (conservative convention).
- A final open position is liquidated at the last close with slippage/commission.
- Equity is marked to market on every bar. No leverage or short positions are used in the current browser engine.
- Annualisation factors: 252 daily, 52 weekly, 12 monthly. Risk-free rate is assumed to be 0 for Sharpe and Sortino.
- CAGR uses elapsed calendar years. Profit factor is gross winning trade P&L / absolute gross losing trade P&L.

## Strategies

SMA crossover, EMA crossover, RSI mean reversion, MACD crossover, Bollinger mean reversion, and momentum breakout. The Strategy Lab lists each rule. Parameter sweeps should be evaluated on chronological train/test windows; the in-browser holdout split is a basic diagnostic, not a robust walk-forward framework.

## Tests

Run:

```bash
pytest -q
```

## Project structure

- `index.html`, `styles.css`, `app.js`: static GitHub Pages application and browser simulation engine.
- `quantlab/`: Python indicators, data validation, simulation and metrics modules.
- `streamlit_app.py`: local Python interface.
- `tests/`: deterministic unit tests with synthetic data.
- `data/sample_ohlcv.csv`: small demonstration dataset.

## Known limitations

Provider access from a browser can be blocked by relay availability, throttling, network policy or ticker coverage. The bulk downloader reports symbols that fail and downloads the successful rows; it does not fabricate missing prices. Use CSV upload or the Python backend if fetch fails. Adjusted close and corporate actions vary by provider; this is not tick-level or intraday execution. The simple simulation does not model market impact, liquidity constraints, taxes, dividends as cash flows, borrow fees, margin, delistings or survivorship bias. The basic train/test split is not a complete walk-forward optimiser.

Past performance does not guarantee future results.
