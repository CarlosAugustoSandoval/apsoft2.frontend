<template>
  <div :id="chartID" style="width: 100%; height: 500px;"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  name: "PersonasEstadisticas",
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
    },
    applySubstring: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    var chart = am4core.create(this.chartID, am4charts.PieChart);
    chart.data = this.data
    if(this.applySubstring){
      chart.events.on("beforedatavalidated", function(ev) {
        var source = ev.target.data;
        source.forEach(row => {
          row.tooltip = row.descripcion
          row.descripcion = row.descripcion.length > 15 ? `${row.descripcion.substring(0, 15)}...` : row.descripcion
        })
      })
    }
    am4core.useTheme(am4themes_animated);
    let title = chart.titles.create();
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "cantidad";
    pieSeries.dataFields.category = "descripcion";
    if(this.applySubstring){
      pieSeries.slices.template.tooltipText = "{tooltip}: {value.value}";
    }
    pieSeries.labels.template.disabled = true;
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;

    title.text = this.title;
    title.fontSize = 20;
    title.marginTop = 5;

    chart.legend = new am4charts.Legend();
  }
}
</script>

<style scoped>

</style>