<template>
  <div class="like-image">
    <a href="#"
      @click.prevent="toggle"
      class="d-inline btn btn-light px-2 py-1"
      :class="{'disabled': !isUserLoggedIn}">
      <i class="fa fa-heart-o like-button" v-if="!isLiked" aria-hidden="true"></i>

      <i class="fa fa-heart like-button" v-if="isLiked" aria-hidden="true" title="Liked"></i>

      <span class="d-inline ml-2 likes-count">
        {{ likes.length }}
      </span>
    </a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    props: {
      id: {
        type: String
      },
      likes: {
        type: Array
      }
    },

    computed: {
      ...mapGetters([
        'userDetails',
        'isUserLoggedIn'
      ]),

      isLiked: {
        get () {
          // check if current user is in list
          // of likes of the image
          return this.likes.indexOf(this.userDetails._id) !== -1
        },

        set (value) {
          return value
        }
      },

      action () {
        return this.isLiked ? 'unlike' : 'like'
      }
    },

    methods: {
      toggle () {
        let authToken = localStorage.getItem('authToken')
        let config = {
          headers: {
            'x-auth': authToken
          }
        }

        axios.put(`http://localhost:3000/imageLike/${this.id}/${this.action}`, {}, config)
          .then((response) => {
            if (this.action === 'like') {
              // add current user to the list of likes for the image
              this.likes.push(this.userDetails._id)
            } else {
              // remove current user from the list of likes for the image
              let index = this.likes.indexOf(this.userDetails._id)
              this.likes.splice(index, 1)
            }
          })
      }
    }
  }
</script>

<style>
  .like-image {
    position: absolute;
    bottom: 10px;
    left: 5px;
    width: 100%;
  }

  .like-button {
    font-size: 1rem;
    color: #f15151;
  }

  .like-button .btn.disabled, .like-button .btn:disabled {
    opacity: 0.85;
  }
</style>