// AuthService.js

const serverIP = "172.17.204.13:5000"

class AuthService {
  
  async login(username: string, password: string){
    try {
      const response = await fetch(`http://${serverIP}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        })
      });

      if (!response.ok) {
        // Handle login error
        const errorText = await response.text();
        console.error('Login failed:', response.status, errorText);
        throw new Error(errorText || 'Login failed');
      }

      // Extract the token from the JSON response
      const responseData = await response.json();
      console.log('Login successful:', responseData);
      const token = responseData.token;

      // Set the token in localStorage
      if (token){
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(){
    localStorage.removeItem('token');
  }

  isAuthenticated(){
    return !!localStorage.getItem('token');
  }

  async register(characterName: string, username: string, password: string){
    try {
      const response = await fetch(`http://${serverIP}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterName,
          username,
          password,
        }),
      });

      if (!response.ok) {
        // Handle registration error
        const errorText = await response.text();
        console.error('Registration failed:', response.status, errorText);
        throw new Error(errorText || 'Registration failed');
      }

      // Registration successful
      const text = await response.text()
      console.log('Registration successful:', text);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
};

export default new AuthService()