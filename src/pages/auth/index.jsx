import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';

export default function Auth() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setShowLogin(true);
  }

  useEffect(() => {
    if (localStorage.loggedInUser) {
      const savedUser = JSON.parse(localStorage.loggedInUser);
      setUser(savedUser);
    }
  }, []);
  return (
    <>
      {user ? (
        <div className='welcome-message'>
          <h2>Hoşgeldin {user.ad} {user.soyad}</h2>
          <p><strong>E-posta: </strong>{user.email}</p>
          <p><strong>Bölüm: </strong>{user.bolum}</p>
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      ) : showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} onLogin={setUser} />
      ) : ( 
        <Register onSwitch={() => setShowLogin(true)} />
      )}
    </>
  )
}

function getSafeLocalStorageData() {
  let data = null;

  try {
    data = localStorage.data ? JSON.parse(localStorage.data) : null;
    // LS'da 'data' varsa onu JSON.parse ile nesneye çeviriyor yoksa null olarak bırakıyor
  } catch (e) {
    // Eğer JSON.parse sırasında bir hata olursa (bozuk veri olması vb...);
    localStorage.removeItem('data');
    // LS'dan data anahtarını siler

    // localStorage.clear() -> tüm LS'daki verileri siler
    // LS'dan tüm verileri siler
    data = null;
  }
  return data;
}

function Login({ onSwitch, onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const sifre = formData.get('sifre');
    const data = getSafeLocalStorageData();

    console.log("data email : " + data.email)
    console.log("data şifre : " + data.sifre)

    if (data && data.email === email && data.sifre === sifre) {
      localStorage.loggedInUser = JSON.stringify(data);
      onLogin(data);
    } else {
      alert('E-posta veya şfire hatalı!');
    }
    e.target.reset();
  }
  return (
    <form className='login-form' onSubmit={handleSubmit} autoComplete='off'>
      <div>
        <label>
          E-posta: 
          <input type="email" name='email' required />
        </label>
      </div>
      <div>
        <label>
          Şifre: 
          <input type="password" name='sifre' required />
        </label>
      </div>
      <div className='switch-link'>
        <button type='submit'>Giriş Yap</button>
        <span>
          Hesabın yok mu?{' '}
          <a href="#" onClick={e => { e.preventDefault(); onSwitch(); }}>Kayıt Ol</a>
        </span>
      </div>
    </form>
  )
}

function Register({ onSwitch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    const exitingData = getSafeLocalStorageData();
    if (exitingData && exitingData.email === formObj.email) {
      alert('Bu e-posta adresi ile zaten bir hesap var!');
      return;
    }

    localStorage.data = JSON.stringify(formObj);
    alert('Kayıt Başarılı!');
    e.target.reset();
  }

  return (
    <form className='register-form' onSubmit={handleSubmit} autoComplete='off'>
      <div>
        <label>
          Adı:
          <input type="text" name='ad' required />
        </label>
      </div>
      <div>
        <label>
          Soyad:
          <input type="text" name='soyad' required />
        </label>
      </div>
      <div>
        <label>
          E-posta:
          <input type="email" name='email' required />
        </label>
      </div>
      <div>
        <label>
          Şifre:
          <input type="password" name='sifre' required />
        </label>
      </div>
      <div>
        <label>
          Cinsiyet:
          <select name="cinsiyet" required>
            <option value="">Seçiniz</option>
            <option value="kadin">Kadın</option>
            <option value="erkek">Erkek</option>
            <option value="diger">Diğer</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Bölüm:
          <select name="bolum" required>
            <option value="">Seçiniz</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="mobil">Mobil</option>
          </select>
        </label>
      </div>
      <div className='switch-link'>
        <button type='submit'>Kayıt Ol</button>
        <span>
          Hesabın var mı? {' '}
          <a href="#" onClick={e => { e.preventDefault(); onSwitch(); }}>Giriş Yap</a>
        </span>
      </div>
    </form>
  )
}