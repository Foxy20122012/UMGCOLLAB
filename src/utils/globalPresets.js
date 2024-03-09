const theme = 'blue';

const presets = {
  theme: `${theme}`,
  appTitle: 'UMG COLLAB',
  images: {
    logo: 'https://aprende.guatemala.com/wp-content/uploads/2016/09/guatemala-universidadmarianogalvez.jpg',
    loginFondo: 'https://umg.edu.gt/img/facultades/sistemas/sistemas6.webp',
    welcomeFondo: 'https://aprende.guatemala.com/wp-content/uploads/2016/09/guatemala-universidadmarianogalvez.jpg',
  },
  locations: {
    login: '/login',
    companiasUsuario: '/welcome',
    welcome: '/UMGCOLLAB',
    profile: '/UMG',
    welcomeTemp: '/welcome'
  },
  toaster: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light'
  }
};

export default presets;