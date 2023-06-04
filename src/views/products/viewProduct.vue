<template>
  <div class="padding">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="order-1 order-sm-1">
          <v-img :src="product.image" aspect-ratio="16/9" contain></v-img>
        </v-col>
        <v-col cols="12" md="6" class="order-2 order-sm-2">
          <div class="padding">
            <v-row>
              <v-label class="font-weight-bold font-xl">Name : </v-label>

              <h2>{{ product.title }}</h2></v-row
            >
            <v-row class="pa-4">
              <v-label class="font-weight-bold font-xl">Category : </v-label>
              <span>{{ product.category }}</span>
            </v-row>
            <v-row class="pa-4"
              ><v-label class="font-weight-bold font-xl">Price : </v-label>
              <span class="tag">{{ product.price }} $</span>
            </v-row>
            <v-row class="pa-4">
              <v-label class="font-weight-bold font-xl">Status : </v-label>
              <span>{{ product.status ? product.status : 'out of stock' }} </span>
            </v-row>
            <v-row class="pa-4">
              <v-label class="font-weight-bold font-xl">Description : </v-label>
              <span>{{ product.description }} </span>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.padding {
  padding: 10% 5%;
}
.font-xl {
  font-size: 40px;
  color: blueviolet;
}
span,
h2 {
  padding: 0 10px;
}
.tag {
  display: inline-block;

  width: auto;
  height: 38px;
  margin: 10px;
  background-color: rgb(187, 242, 187);
  -webkit-border-radius: 3px 4px 4px 3px;
  -moz-border-radius: 3px 4px 4px 3px;
  border-radius: 3px 4px 4px 3px;

  border-left: 1px solid #979797;

  /* This makes room for the triangle */
  margin-left: 19px;

  position: relative;

  color: rgb(118, 28, 208);
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 22px;
  line-height: 38px;

  padding: 0 10px 0 10px;
}

/* Makes the triangle */
.tag:before {
  content: '';
  position: absolute;
  display: block;
  left: -19px;
  width: 0;
  height: 0;
  border-top: 19px solid transparent;
  border-bottom: 19px solid transparent;
  border-right: 19px solid rgb(118, 28, 208);
}

/* Makes the circle */
.tag:after {
  content: '';
  background-color: white;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  display: block;
  position: absolute;
  left: -9px;
  top: 17px;
}
</style>
<style>
@media screen and (max-width: 800px) {
  .row1 {
    flex-direction: column;
  }
  .row2,
  .row4 {
    flex-direction: column-reverse;
  }
}
</style>
<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'view-product',
  methods: {
    getProduct() {}
  },
  mounted() {
    axios
      .get(`https://fakestoreapi.com/products/${this.$route.params.id}`)
      .then((response) => {
        //this.product = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    let Store = JSON.parse(localStorage.getItem('items'))
    Store = Store.filter((item) => item.id === parseInt(this.$route.params.id))
    this.product = Store[0]
    console.log(Store[0], this.$route.params.id, 'get item')
  },
  data() {
    return {
      product: {
        title: '',
        category: '',
        price: '',
        description: '',
        image: ''
      }
    }
  }
})
</script>
