<template >
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-for="pages in paginationService.pageTotal" :key="pages" :class="{'active': paginationService.currentPage === pages}"><a class="page-link" href="#" @click.prevent="getPagesService(pages)">{{ pages }}</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    paginationService: {
      type: Object,
    },
  },
  methods: {
    getPagesService(item) {
      this.$emit('pageService', item);
    },
  },
};
</script>