<template>
  <div :id="chartID" style="width: 100%; height: 450px;"></div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  name: "HogaresEstadisticas",
  props: {
    data: {
      type: [Array, Object],
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    chartID: {
      type: String,
      default: null
    }
  },
  mounted() {
    var chart = am4core.create(this.chartID, am4charts.PieChart);
    am4core.useTheme(am4themes_animated);
    let title = chart.titles.create();
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "cantidad";
    pieSeries.dataFields.category = "descripcion";
    pieSeries.labels.template.disabled = true;
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;

    title.text = this.title;
    title.fontSize = 20;
    title.marginTop = 5;

    chart.data = this.data
    chart.legend = new am4charts.Legend();
  }
}
</script>

<style scoped>

</style>