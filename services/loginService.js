
export const login = async (data) => {
    const res = await fetch(
      `http://localhost:3000/api/login`, 
        {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data),
        }
      )
    if (res.status===500) {
        return false
    } else if (res.status===200) {
        const resToJson = await res.json()
        return resToJson
    }
}

// For any follow-ups who are interested in how I solved it:

// Login happens client-side only calling the login api method. When successful, I receive a token which I then set in a cookie using js-cookie:

// const result = await api.login(user, pwd);
// if (result.status === 200) {
//   jsCookie.set('token', result.token);
// }

// Then, server-side on page initialization I can read the cookie if necessary:

// import jsHttpCookie from 'cookie';

// class MyPage extends Component {
//   static async getInitialProps({ req }) {
//     const initProps = {};
//     if (req && req.headers) {
//       const cookies = req.headers.cookie;
//       if (typeof cookies === 'string') {
//         const cookiesJSON = jsHttpCookie.parse(cookies);
//         initProps.token = cookiesJSON.token;
//       }
//     }
//     return initProps;
//   }
// }