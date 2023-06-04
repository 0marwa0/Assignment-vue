<template>
  <div class="padding">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="order-1 order-sm-1">
          <v-col class="justify-content-space-between" style="height: 100%">
            <v-col>
              <template v-if="preview" :width="100%">
                <v-img :width="600" :height="300" aspect-ratio="1/1" cover :src="preview"></v-img>
              </template>
              <template v-else="preview">
                <v-img
                  :width="600"
                  :height="300"
                  aspect-ratio="1/1"
                  cover
                  :src="imagePlaceHolder"
                ></v-img>
              </template>
            </v-col>
            <v-file-input
              type="file"
              variant="underlined"
              accept="image/*"
              style="width: 400px"
              @change="previewImage"
              id="image"
          /></v-col>
        </v-col>
        <v-col cols="12" md="6" class="order-2 order-sm-2">
          <div class="padding">
            <inputText :handleChange="handleChange" lable="title" :value="product.title" />

            <inputText :handleChange="handleChange" lable="price" :value="product.price" />

            <Category :selectedCategory="selectedCategory" :handleChange="handleChange" />

            <inputText
              :handleChange="handleChange"
              lable="description"
              :value="product.description"
            />
            <v-btn class="btn-main" @click="type === 'create' ? handleAdd() : handleUpdate()">
              Save</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { addProduct } from '../../stores/api'
import Category from '../../components/shared/category.vue'
import inputText from '../../components/shared/inputText.vue'
import { updateAPI } from '../../stores/api'
import axios from 'axios'
import '../../assets/main.css'
export default defineComponent({
  name: 'Product',
  components: { Category, inputText },
  mounted() {
    if (this.$route.params.type === 'edit') {
      this.getProduct()
    }
  },
  methods: {
    previewImage: function (event) {
      var input = event.target
      if (input.files) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
          this.product.image = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
    getProduct() {
      axios
        .get(`https://fakestoreapi.com/products/${this.$route.params.id}`)
        .then((response) => {
          // this.product = response.data
          // this.imagePlaceHolder = response.data.image
          // this.selectedCategory = response.data.category
        })
        .catch((error) => {
          console.log(error)
        })
      let Store = JSON.parse(localStorage.getItem('items'))
      Store = Store.filter((item) => item.id === parseInt(this.$route.params.id))
      this.imagePlaceHolder = Store[0].image
      this.selectedCategory = Store[0].category
      this.product = Store[0]
    },
    handleUpdate() {
      updateAPI(parseInt(this.$route.params.id), JSON.parse(JSON.stringify(this.product)))
      this.$router.push('/')
    },
    handleAdd() {
      // console.log(JSON.parse(JSON.stringify(this.product)))
      addProduct(JSON.parse(JSON.stringify(this.product)))
      this.$router.push('/')
    },
    handleChange(e, name) {
      this.product[name] = e.target.value
    }
  },
  data() {
    return {
      image: null,
      preview: null,
      type: this.$route.params.type,
      imagePlaceHolder: 'https://fakeimg.pl/400x300/?text=product image',
      selectedCategory: '',
      product: {
        id: JSON.parse(localStorage.getItem('items')).length + 1,
        title: '',
        status: 'active',
        category: this.selectedCategory,
        price: '',
        description: '',
        image: ''
      }
    }
  }
})
</script>
