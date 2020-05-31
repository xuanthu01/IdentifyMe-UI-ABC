<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Thông tin chi tiết schema {{ schema.name }}</span>
    </div>
    <div v-for="o in Object.entries(schema)" :key="o[0]" class="text item">
      {{ o[0] + " : " + o[1] }}
    </div>
  </el-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    schema_id: String
  },
  async mounted() {
    await this.fetchSchemaById(this.schema_id);
    this.schema = this.schemas.find(schema => schema.id === this.schema_id);
  },
  data() {
    return {
      schema: {}
    };
  },
  methods: {
    ...mapActions("schemas/", ["fetchSchemaById"])
  },
  computed: {
    ...mapState("schemas/", ["schemas"])
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  font-weight: bold;
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
