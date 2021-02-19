<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../../../assets/logo.png">-->
    <estadisticas></estadisticas>
  </div>
</template>

<script>
import Estadisticas from '@/modules/caracterizacion/views/estadisticas/Estadisticas'
export default {
  name: 'Home',
  components: {
    Estadisticas
  },
}
</script>
