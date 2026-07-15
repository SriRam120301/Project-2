# 🛒 Olist E-Commerce Analytics & Delivery Delay Prediction

> An end-to-end Data Analytics and Machine Learning project that analyzes Brazilian e-commerce operations and predicts delivery delays using SQL, Python, Machine Learning, and Tableau.

---

## 📌 Project Overview

This project demonstrates a complete data analytics workflow from raw data to business insights.

Using the **Olist Brazilian E-Commerce Public Dataset**, multiple relational datasets were integrated, cleaned, analyzed, and transformed into an interactive Business Intelligence dashboard and Machine Learning prediction model.

The project follows an industry-standard analytics pipeline including:

- Data Collection
- Data Cleaning
- SQL Analysis
- Exploratory Data Analysis
- Feature Engineering
- Machine Learning
- Business Intelligence Dashboard

---

## 🎯 Business Problem

Delivery delays are one of the major challenges in e-commerce logistics.

Late deliveries can lead to:

- Poor customer satisfaction
- Negative product reviews
- Increased logistics costs
- Lower seller ratings

This project predicts delivery delays while identifying the business factors responsible for them.

---

# 📂 Dataset

**Source**

Olist Brazilian E-Commerce Public Dataset

The project combines multiple datasets including:

- Customers
- Orders
- Order Items
- Payments
- Reviews
- Sellers
- Products
- Geolocation

These datasets were merged into one analytical dataset for reporting and prediction.

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|----------------|
| Python | Data Analysis & Machine Learning |
| PostgreSQL | Data Storage & SQL Queries |
| Pandas | Data Cleaning |
| NumPy | Numerical Computing |
| Scikit-Learn | Machine Learning |
| XGBoost | Predictive Modeling |
| Tableau | Dashboard Development |
| Git & GitHub | Version Control |

---

# 📊 Project Workflow

```text
Raw CSV Files
      │
      ▼
PostgreSQL Database
      │
      ▼
Data Cleaning
      │
      ▼
Feature Engineering
      │
      ▼
Exploratory Data Analysis
      │
      ▼
Machine Learning Models
      │
      ▼
Tableau Dashboard
      │
      ▼
Business Insights
```

---

# 📁 Repository Structure

```text
olist-delivery-delay-prediction/

│
├── data/
│
├── notebooks/
│   ├── 01_data_cleaning.ipynb
│   ├── 02_feature_engineering.ipynb
│   ├── 03_eda.ipynb
│   └── 04_model_training.ipynb
│
├── sql/
│
├── dashboard/
│
├── images/
│
├── requirements.txt
│
├── LICENSE
│
└── README.md
```

---

# 🧹 Data Cleaning

The following preprocessing steps were performed:

- Removed duplicates
- Treated missing values
- Converted data types
- Parsed datetime columns
- Merged multiple datasets
- Removed unnecessary columns
- Standardized categorical values

---

# ⚙️ Feature Engineering

Created new features such as:

- Purchase Hour
- Purchase Month
- Purchase Weekday
- Delivery Duration
- Estimated Delivery Duration
- Product Volume
- Freight Cost
- Payment Information

---

# 📈 Exploratory Data Analysis

Performed analysis including:

- Monthly Sales Trend
- Delivery Performance
- Order Status Distribution
- Seller Analysis
- Customer Distribution
- Product Categories
- Payment Methods
- Correlation Heatmap

---

# 🤖 Machine Learning Models

The following regression models were implemented:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor
- XGBoost Regressor

Evaluation Metrics:

- MAE
- RMSE
- R² Score

The Random Forest model achieved the best predictive performance.

---

# 📊 Dashboard

The Tableau dashboard provides:

- Executive KPIs
- Sales Performance
- Delivery Analysis
- Customer Insights
- Seller Performance
- Product Analysis
- Geographic Distribution
- Interactive Filters

---

# 💡 Key Business Insights

- Delivery delays vary across regions.
- Freight cost impacts delivery time.
- Product dimensions influence shipping duration.
- Certain sellers consistently outperform others.
- Machine Learning can effectively predict delivery delays.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/SriRam120301/YOUR_REPOSITORY_NAME.git
```

---

## 2. Navigate to the Project

```bash
cd YOUR_REPOSITORY_NAME
```

---

## 3. Create a Virtual Environment (Optional)

Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Run the Notebook

```bash
jupyter notebook
```

Open:

```
notebooks/04_model_training.ipynb
```

---

# 📷 Screenshots

Add your dashboard screenshots inside the **images** folder.

Example:

```
images/dashboard.png
images/model_results.png
images/sales_trend.png
```

---

# 🚀 Future Improvements

- Streamlit Deployment
- FastAPI Integration
- Docker Container
- Automated ETL Pipeline
- Cloud Deployment
- Hyperparameter Tuning

---

# 👨‍💻 Author

**KANDHI SRIRAM REDDY**

MSc Data Science & Business Analysis

EDC Paris Business School

GitHub

https://github.com/SriRam120301

LinkedIn

https://www.linkedin.com/in/YOUR-LINKEDIN/

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, please consider giving it a star!
