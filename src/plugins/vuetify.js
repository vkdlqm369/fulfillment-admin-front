import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

const vuetify = createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#ffffff', 
        },
      },
    },
  },
})

export default vuetify
