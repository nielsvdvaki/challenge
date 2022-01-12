<template>
  <section id="searchbar">
    <h1>Search for customer</h1>
    <input type="text" placeholder="Search for customer" v-model="query">
    <ul>
      <li v-for="customer in filteredCustomers" :key="customer.id">
        <a :href="'/customer/' + customer.id">{{ customer.first_name }} {{ customer.last_name }}</a>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: "SearcBar",

  data() {
    return {
      customers: [],
      query: ""
    }
  },

  computed: {
    results() {
      return []
    },

    filteredCustomers: function () {
      if (this.query.length > 0) {
        return this.customers.filter(item => {
          return item.first_name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        })
      } else {
        return []
      }
    }
  },
  mounted() {
    const query = `
{
  customers {
    id,
    first_name,
    last_name
  }
}
`;
    const opts = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query})
    };
    fetch('http://localhost:42069/graphql', opts)
      .then(response => response.json())
      .then(data => {
        this.customers = data.data.customers
      })
  }
}
</script>
<style>
input {
  height: 35px;
  text-align: left;
  padding-left: 10px;
  border-radius: 15px;
  border: 1px solid gray;

}

ul {
  display: block;
  margin: 5px auto 0;
  padding-left: 5px;
  list-style: none;
  text-align: left;
}

li {
  border: 1px solid gray;
  max-width: 20%;
  padding: 5px;
}

input:focus {
  outline: none;
}
</style>
