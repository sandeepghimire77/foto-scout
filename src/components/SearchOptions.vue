<template>
  <div class="mb-4">
    <div class="mx-3">
      <a href="#" @click.prevent="toggle">
        <template v-if="isVisible">{{ $t('hide-advanced-options') }}</template>
        <template v-if="!isVisible">{{ $t('show-advanced-options') }}</template>
      </a>
    </div>

    <div v-if="isVisible" class="my-3">
      <div class="col-md-12">
        <b-form-group
          :label="$t('search-radius')"
          label-for="search-radius"
          class="float-left pt-2 pr-2"
        >
        </b-form-group>
        <b-form-input v-model="options.radius"
          type="number"
          id="search-radius"
          class="float-left col-md-3"
          min-value="1">
        </b-form-input>
        <div class="clearfix"></div>
      </div>

      <div class="col-md-12">
        <b-form-group :label="$t('categories')">
          <b-form-checkbox-group
            id="categories"
            name="categories"
            v-model="options.categories"
            :options="imageCategories">
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isVisible: false,

        options: {
          categories: [],
          radius: 50
        }
      }
    },

    computed: {
      ...mapGetters([
        'imageCategories',
        'searchOptions'
      ])
    },

    mounted () {
      this.$store.dispatch('getImageCategories')
    },

    methods: {
      /**
       * Toggle the visibility of options
       */
      toggle () {
        this.isVisible = !this.isVisible
      }
    },

    watch: {
      /**
       * Change the options in Vuex state as well
       * if options are changed
       * @type {Object}
       */
      options: {
        handler (newOptions) {
          this.$store.commit('setSearchOptions', {
            options: newOptions
          })
        },

        deep: true
      }
    }
  }
</script>