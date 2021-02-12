import Dexie from 'dexie'

const caracterizacion = new Dexie('caracterizacion')
caracterizacion.version(2).stores({
  encuestas: 'idd++,id,ficha'
})

export default caracterizacion
