import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
class login(BaseModel):
    email: str
    password: str
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
@app.post("/sign_in")
def sign_in(data:login):
    conn = mysql.connector.connect(host="localhost", user="root", password="Admin@123", database="Plants_app")
    cursor = conn.cursor()
    sql = "SELECT * FROM user where email=%s and password=%s "
    cursor.execute(sql, (data.email, data.password))
    use=cursor.fetchone()
    if use :
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(data={"sub": data.email}, expires_delta=access_token_expires)
        return {"access_token": token, "token_type": "bearer"}

    raise HTTPException(status_code=401, detail="البريد الإلكتروني أو كلمة المرور غير صحيحة")
@app.post("/sign_up")
def sign_up(data:login):
    conn = mysql.connector.connect(host="localhost", user="root", password="Admin@123", database="Plants_app")
    cursor = conn.cursor()
    sql = "insert into user (email, password) values (%s, %s)"
    cursor.execute(sql, (data.email, data.password))
    conn.commit()
    cursor.close()
    conn.close()
    return {"massge":"تم اضافه الحساب"}
if __name__=="__main__":
    uvicorn.run(app, port=8000)
