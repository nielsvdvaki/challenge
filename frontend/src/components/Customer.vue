<template>
  <section id="customerDetailView">
    <h1>{{ customer.first_name }} {{ customer.last_name }}</h1>
    <p>Email: {{ customer.email }}</p>
    <p>Country: {{ this.getCountry(customer) }}</p>
    <p>IP: {{ customer.ip }}</p>
    <div id="customerLocation"></div>
  </section>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';



mapboxgl.accessToken = 'pk.eyJ1IjoibWFhcnRlbnZ3IiwiYSI6ImNqMnN5enh4YjAwNGYyd25vOTRzeDcwZmIifQ.X9XFeEGSq6lt34thD1VfIw';


export default {
  data() {
    return {
      customer: {
        first_name: "Loading customer data.."
      },
      ipData: null
    }
  },
  methods: {
    /**
     * Retrieves GEO location based on IP address
     * @param customer
     */
    retrieveIpInformation(customer) {
      axios.get('https://ipapi.co/' + customer.ip + '/json').then(response => this.ipData = response.data)
    },

    /**
     * Translates lat, long to Mapbox format.
     * @param customer
     * @returns {*[]}
     */
    latLngToArray(customer) {
      return [customer.longitude, customer.latitude];
    },

    /**
     * Returns passport style country code.
     * @param customer
     * @returns {*}
     */
    getCountry(customer) {
      let wc = require('which-country');
      return wc(this.latLngToArray(customer));
    }
  },
  mounted() {
    const query = `{ customer(id: ` + this.$route.params.id + `) { id, first_name, last_name, latitude, longitude, email, ip } } `;
    const opts = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query})
    };
    fetch('http://localhost:42069/graphql', opts)
      .then(response => response.json())
      .then(data => {
        this.customer = data.data.customer
      }).then(() => {

      // Load mapbox for customer location
      const map = new mapboxgl.Map({
        container: 'customerLocation',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.latLngToArray(this.customer),
        zoom: 9
      });

      // Add customer location to map
      new mapboxgl.Marker()
        .setLngLat(this.latLngToArray(this.customer))
        .addTo(map);

      // Load customer IP information
      this.retrieveIpInformation(this.customer);
    })
  }
}
</script>

<style>
#customerLocation {
  max-width: 500px;
  min-height: 300px;
}
</style>
