from flask import Flask, request, jsonify
from flask_cors import CORS
from tripleDes import triple_des, CBC, PAD_PKCS5

app = Flask(__name__)
CORS(app)

def enc_dec(string, type):
  key = b"49f8518b62e69dab6a1ee3ca"
  k = triple_des(key, CBC, padmode=PAD_PKCS5)

  if type == "encrypt":
    encrypted_data = k.encrypt(string.encode('utf-8'))
    cipher_text = encrypted_data.hex()
    return cipher_text

  elif type == "decrypt":
    decrypted_data = k.decrypt(bytes.fromhex(string))
    original_text = decrypted_data.decode('utf-8')
    return original_text

@app.route('/encrypt', methods=['POST'])
def encrypt():
  data = request.get_json()
  string = data.get('message', '')
  result = enc_dec(string, 'encrypt')
  return jsonify({'cipher': result})

@app.route('/decrypt', methods=['POST'])
def decrypt():
  data = request.get_json()
  string = data.get('cipher', '')
  result = enc_dec(string, 'decrypt')
  return jsonify({'message': result})

if __name__ == "__main__":
  app.run(debug=True, port=8000)
