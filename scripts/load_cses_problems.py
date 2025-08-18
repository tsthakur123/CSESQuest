import requests
from bs4 import BeautifulSoup
import psycopg2
import os

# NeonDB connection
DB_URL = "postgresql://neondb_owner:npg_2rXEG3yNitSW@ep-misty-mountain-a1rm84cq-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

conn = psycopg2.connect(DB_URL)
cur = conn.cursor()

# Create table if not exists
cur.execute("""
CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    cses_id INT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    link TEXT NOT NULL
);
""")
conn.commit()

# Fetch CSES problemset
BASE_URL = "https://cses.fi"
PROBLEMSET_URL = f"{BASE_URL}/problemset/"

response = requests.get(PROBLEMSET_URL)
soup = BeautifulSoup(response.text, "html.parser")

# Parse problems
# Parse problems
problems = []
for li in soup.select("ul.task-list li.task a"):
    title = li.text.strip()
    link = BASE_URL + li["href"]
    cses_id = int(li["href"].split("/")[-1])
    problems.append((cses_id, title, link))

print(f"📝 Total problems fetched: {len(problems)}")  # <-- log problem count

# Insert into database
for cses_id, title, link in problems:
    try:
        cur.execute(
            "INSERT INTO problems (cses_id, title, link) VALUES (%s, %s, %s) ON CONFLICT (cses_id) DO NOTHING;",
            (cses_id, title, link)
        )
    except Exception as e:
        print(f"Error inserting {title}: {e}")


conn.commit()
cur.close()
conn.close()
print("✅ CSES problems loaded into NeonDB!")
