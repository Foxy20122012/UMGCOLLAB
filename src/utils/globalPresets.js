const theme = 'blue';

const presets = {
  theme: `${theme}`,
  appTitle: 'UMG COLLAB',
  images: {
    logo: 'https://scontent.fgua9-2.fna.fbcdn.net/v/t39.30808-6/309266058_468141865338461_4082305904910676999_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vnDKGh-TxPgQ7kNvgGYt-R8&_nc_ht=scontent.fgua9-2.fna&_nc_gid=AbSobnxSw1guh68tfPgt1di&oh=00_AYDW6yA7mrzIn7hOtnxUysKlhZilCQdTdPS9TJ8AjM3ong&oe=66F3F175',
    loginFondo: 'https://mapio.net/images-p/44335754.jpg',
    welcomeFondo: 'https://aprende.guatemala.com/wp-content/uploads/2016/09/guatemala-universidadmarianogalvez.jpg',
    imageLoader: '/Icon.jpeg',
    icon: '/Icon.jpeg',
  },
  locations: {
    login: '/login',
    companiasUsuario: '/welcome',
    welcome: '/UMGCOLLAB',
    profile: '/Admin/profile',
    profileEstudiante: '/student/profile',
    profileCatedratico: '/professor/profile',
    profileAdmin: '/admin/profile',
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