<template>
  <div class="padding">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="order-1 order-sm-1">
          <v-col class="justify-content-space-between" style="height: 100%">
            <v-col>
              <template v-if="preview" :width="100%">
                <v-img :width="400" :height="300" aspect-ratio="1/1" cover :src="preview"></v-img>
              </template>
              <template v-else="preview">
                <v-img
                  :width="400"
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
            <v-text-field
              clearable
              variant="underlined"
              :value="product.title"
              autofocus
              @input="handleChange($event, 'title')"
            ></v-text-field>

            <v-text-field
              @input="handleChange($event, 'price')"
              clearable
              :value="product.price"
              autofocus
              variant="underlined"
            ></v-text-field>
            <Category :selectedCategory="selectedCategory" :handleChange="handleChange" />

            <v-textarea
              @input="handleChange($event, 'description')"
              clearable
              :value="product.description"
              variant="underlined"
            ></v-textarea>
            <v-btn color="#580bcb" @click="type === 'create' ? handleAdd() : handleUpdate()">
              Save</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.padding {
  padding: 0;
}
</style>

<script>
import { defineComponent } from 'vue'
import { addProduct } from '../../stores/api'
import Category from '../../components/shared/category.vue'
import { updateAPI } from '../../stores/api'
import axios from 'axios'
export default defineComponent({
  name: 'new-product',
  components: { Category },
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
          this.product = response.data
          this.imagePlaceHolder = response.data.image
          this.selectedCategory = response.data.category
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleUpdate() {
      updateAPI(parseInt(this.$route.params.id), JSON.parse(JSON.stringify(this.product)))
      this.$router.push('/')
    },
    handleAdd() {
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
        category: this.selectedCategory,
        price: '',
        description: '',
        image: ''
      }
    }
  }
})
</script>
