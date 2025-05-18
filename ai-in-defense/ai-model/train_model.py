import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score
import joblib

# 1. Load dataset
# Using relative path instead of hardcoded one
dataset_path = os.path.join('dataset', 'war_history.csv')
df = pd.read_csv(dataset_path)
# 2. Feature engineering
#   - Total strength = troops * modernization
df['strengthA'] = df['troopsA'] * df['modA']
df['strengthB'] = df['troopsB'] * df['modB']
#   - Ratio feature
df['strength_ratio'] = df['strengthA'] / (df['strengthA'] + df['strengthB'])

# 3. Prepare X, y
X = df[['strength_ratio']]
y = (df['winner'] == df['countryA']).astype(int)  # 1 if A won, else 0

# 4. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 5. Model training
model = LogisticRegression()
model.fit(X_train, y_train)

# 6. Evaluation
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]
print("Classification Report:")
print(classification_report(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_prob))

# 7. Save the trained model
joblib.dump(model, 'model.pkl')
print("Model saved to model.pkl")
