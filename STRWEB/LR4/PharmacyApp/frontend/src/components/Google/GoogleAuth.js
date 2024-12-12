import React from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuth = () => {
 const clientId = "83789705811-d0ahcdb9ff8sepng7ugpqfun48chbsn0.apps.googleusercontent.com";
 const sendTokenToBackend = async (credentialResponse) => {
  const token = credentialResponse.credential; // Это ваш токен

  try {
    // Отправка токена на сервер
    const response = await axios.post('http://localhost:5000/google-auth/', { credential: token, client_id: clientId });

    // Проверка успешного ответа от сервера
    console.log('Server Response:', response.data);

    // Сохранение данных пользователя и токена в localStorage
    const userInfo = {
      user: response.data.user,
      token: response.data.token,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Сохраняем данные в localStorage

    // Теперь можно использовать данные из localStorage, например, для отображения информации о пользователе
    // Можно перенаправить пользователя на другую страницу
    // window.location.href = '/home'; // Например, можно перенаправить на домашнюю страницу

  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
};


  return (
   <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
      //  onSuccess={credentialResponse => {
      //    console.log(credentialResponse);
      //  }}
        onSuccess={sendTokenToBackend} 
       onError={() => {
         console.log('Login Failed');
       }}
     />
   </GoogleOAuthProvider>
   );
 };
export default GoogleAuth;