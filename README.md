# QuantLab — AI-Powered Quantitative Trading & Backtesting

QuantLab is a historical quantitative research and simulation platform. It provides a browser-based terminal that can be hosted on GitHub Pages and a Python/Streamlit research application for local or server deployment.

> **Research only.** No broker connection, live market feed or order execution is implemented. Historical results are not a forecast and are not investment advice.

## Deployment choices

| Version | Where it runs | What works |
|---|---|---|
| GitHub Pages | Static browser app in `index.html` | Historical provider fetch where browser CORS allows (daily, weekly, monthly and supported intraday intervals), CSV upload with timestamped OHLCV bars, visual/formula custom strategies, long/short simulation, position sizing and exit controls, parameter sweeps, metrics, charts, trade history and exports |
| Python / Streamlit | Your computer or a Python hosting service | Python data pipeline, pandas/NumPy research components and optional Gemini integration |

**Important:** GitHub Pages cannot run Python, Streamlit, SQLite, or server-side secrets. Pages serves static HTML/CSS/JavaScript only. The browser app is therefore self-contained and does not pretend to expose the Python backend.

## GitHub Pages setup

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main`, folder `/ (root)`, and save.
4. Wait for the Pages deployment check to finish. Open the published URL shown on the Pages settings screen.

The app opens with a synthetic demo series. The Indian equity universe contains the original 100 Nifty 100 names plus 500 additional unique Indian listed companies ranked by latest market capitalisation (snapshot: 2 November 2026). The additional 500 are selected from the source large-cap, mid-cap and top-500 small-cap tables, with the original 100 excluded and the remaining candidates ranked by current market cap. Search/filter by company, ticker, sector or universe group. The history downloader defaults to 1970-01-01 through the latest selected end date; each company returns its earliest available Yahoo Finance bar through that date, which may differ by listing date and provider coverage. Use **Download all 500 additions** to request full available historical OHLCV and export one Excel-friendly CSV. This is on-demand historical download, not a preloaded price database or an official NSE feed.

## Free historical data sources

- **Yahoo Finance chart endpoint via `proxy.cors.dev`**: free historical bars for many Indian `.NS` symbols without an API key. The browser relay is a third-party dependency and can be rate-limited or unavailable. The feed is unofficial and not an NSE-authorised data feed.
- **Nifty 100 universe**: 100 large-cap Indian companies across financials, IT, energy, healthcare, autos, consumer, industrials and other NSE sectors. The roster is a saved snapshot, not a live constituent synchronisation.
- **CSV upload**: deterministic fallback for any market when you have a correctly formatted OHLCV file.

When a browser blocks provider requests, that is a provider/network/CORS restriction rather than evidence that a symbol does not exist. Use CSV upload or the Python data path.

CSV required fields (case-insensitive): `Date, Open, High, Low, Close`. `Volume` and `Adj Close` are optional. The `Date` field may include a time and timezone (for example `2026-10-01T09:15:00+05:30`); intraday timestamps are preserved and duplicate timestamps are rejected. Select the matching bar interval in the terminal. Use the **Bars per year** override for non-standard calendars or 24/7 markets. Example:

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

## Custom strategy builder

The GitHub Pages app includes a no-code visual builder and a safe formula editor. The formula editor includes editable starter templates for trend following, RSI bounce, Donchian breakout, Bollinger reversion, MACD crossover, and MACD long/short logic.

### Visual builder

Create separate long-entry, long-exit, short-entry and short-cover rules. Each group supports ALL (AND) or ANY (OR) logic. Compare OHLCV fields or derived indicators against numeric thresholds or other fields/indicators.

Supported visual fields and indicators:
- Price and volume: Open, High, Low, Close, Volume, HL2, HLC3, OHLC4.
- Trend and volume-weighted: SMA, EMA, WMA, VWMA, rolling VWAP, volume SMA, Keltner channels.
- Momentum and volatility: RSI, MACD line/signal/histogram, ATR, ADX, CCI, ROC, TRIX, Williams %R, DPO.
- Flow and range: MFI, Aroon up/down/oscillator, Chaikin Money Flow, Chaikin oscillator, Bollinger bands, Stochastic %K/%D, Donchian high/low, OBV.

CSV files can include additional numeric columns alongside OHLCV, for example sentiment, P/E, revenue growth, index returns, factor scores or proprietary signals. Each extra numeric column becomes a formula variable prefixed with `x_` (for example `x_sentiment` or `x_pe`) and is available in the visual rule builder after upload. Missing cells remain missing; the app does not forward-fill or interpolate them. Users must align feature values to the correct historical timestamp and avoid look-ahead leakage. Formula indicators can operate over custom series too, for example `SMA(x_sentiment, 20)` or `EMA(x_revenue_growth, 10)`.

Comparisons include crosses above/below, greater than, less than, greater/equal and less/equal. Indicator parameters (periods, MACD fast/slow/signal and Bollinger multiplier) are editable per rule.

### Formula editor

For more involved strategies, use expressions such as:

```text
close > SMA(p1) && RSI(p2) > p3 && ADX(14) > 20
crossesBelow(close, EMA(p1)) || RSI(p2) > 80
```

The parser accepts market fields, indicator functions, arithmetic, comparisons, AND/OR/NOT, parentheses, and helpers including `crossesAbove`, `crossesBelow`, `rising`, `falling`, `lag`, `prev`, `change`, `pctChange`, `barssince`, `valuewhen`, `highest`, `lowest`, `sum`, `avg`, `stdev`, `variance`, `zscore`, `correlation`, `beta`, `slope`, `linreg`, `between`, `min`, `max`, `abs`, `sqrt`, `log`, `exp`, `pow`, `round`, `floor`, `ceil`, `if` and `nz`. Formulas are parsed into a restricted expression tree; they are not executed as arbitrary JavaScript. Reusable variables `p1` through `p6` can be assigned current values and min/max/step ranges. Date/time helpers (`hour`, `minute`, `time`, `dayofweek`, `dayofmonth`, `month`, `year`, `session`) accept an optional UTC offset in minutes, so intraday rules can use the exchange's local clock.

### Cross-symbol robustness tests

The Strategy Lab can run the currently selected built-in or saved custom strategy separately across up to 10 NSE symbols. It reports each symbol's return, CAGR, Sharpe, drawdown, win rate, trade count and final equity, and can export the result table as CSV. Symbols without usable Yahoo Finance history are listed with an error instead of silently disappearing.

This is a **robustness comparison**, not a multi-asset portfolio backtest: every symbol is tested independently from the configured starting capital. Yahoo batch tests do not include custom CSV-only feature columns; formulas depending on those columns are blocked from this test to avoid misleading zero-signal results.

### Parameter sweeps

Save a formula strategy, load historical data, and run a bounded parameter sweep across the configured ranges for `p1` through `p6`. Each sweep is capped at 120 combinations and can rank results by Sharpe, total return, Sortino or drawdown. The best in-sample combination can be applied to the saved strategy.

A sweep is exploratory, not a forecast. Selecting the best combination on the same history used to report performance creates data-mining and overfitting risk. Use a separate chronological holdout or walk-forward test before drawing conclusions.

### Saving and portability

Named strategies can be loaded, duplicated, edited and deleted. They are saved in the current browser's local storage. Use **Export strategy JSON** to back them up or move them to another browser/device; use **Import JSON** to restore them.

## Backtesting conventions

- Signals use completed historical bars; market-entry and signal-exit orders execute at the **next bar open**.
- The browser engine supports one net position in one selected instrument at a time. Optional pyramiding can scale that position in up to 10 entry legs (default: one); entry quantity and fees are blended into one position cost basis. A long/short strategy can reverse when the opposite-side entry signal appears. It does not run multiple symbols or independent simultaneous positions.
- Position sizing supports percent of equity, fixed INR allocation, or risk-based sizing. Risk-based sizing requires a stop-loss percentage and caps notional exposure at current equity; leverage is not used.
- Long and short positions are marked to market with signed quantities. Short-sale proceeds are credited to cash and the short liability is marked against current price. The optional annual short-borrow rate is converted to a per-bar cost on short notional and deducted from cash/P&L. This is a user-supplied estimate, not a live broker borrow quote or a guarantee that a security is available to borrow.
- The terminal's price-adjustment setting can use raw OHLC or apply the adjusted-close / close factor to open, high, low and close when adjusted-close data is present. If the provider/file does not supply adjusted close, the adjusted option falls back to raw OHLC. Review the loaded-data summary to see which basis was used.
- Commission and slippage settings are applied to market entries and market exits. Stop-loss, trailing-stop and take-profit triggers are checked against subsequent OHLC bars; stop-loss is assumed first if both stop and target are touched in one bar. Stop-market fills use the bar open when price gaps through the stop, otherwise the stop level, then apply configured slippage. Take-profit triggers use the limit level. Trailing stops use the best price observed on prior completed bars.
- A maximum holding-bar limit can close positions at the next bar open. Any open position at the end of the test is liquidated at the final close with configured slippage/commission.
- Sharpe and Sortino use the configurable annual risk-free rate converted to a per-bar rate. Annualisation defaults are 18,900 five-minute, 6,300 fifteen-minute, 3,150 thirty-minute, 1,575 hourly, 252 daily, 52 weekly and 12 monthly bars per year; the terminal allows a manual override. The risk-free rate and short-borrow rate are converted using that per-bar factor. CAGR uses elapsed calendar years.
- The buy-and-hold line is a long benchmark, even when testing a short-only strategy; compare it as market context rather than a like-for-like short benchmark.

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

Provider access from a browser can be blocked by relay availability, throttling, network policy or ticker coverage. The bulk downloader reports symbols that fail and downloads the successful rows; it does not fabricate missing prices. Use CSV upload or the Python backend if fetch fails. Adjusted close and corporate actions vary by provider; this is not tick-level or intraday execution. The simple simulation does not model market impact, liquidity constraints, taxes, dividends as cash flows, borrow availability/fees, margin, funding rates, delistings or survivorship bias. It operates on one instrument and the OHLCV bars available from the selected provider or uploaded file; it is not a tick-level, order-book, options, multi-asset portfolio or live-execution engine. The basic train/test split is not a complete walk-forward optimiser.

Past performance does not guarantee future results.
