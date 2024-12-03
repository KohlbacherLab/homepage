<script async setup>
import { useData } from 'vitepress';
import KPerson from '../.vitepress/components/person/KPerson.vue';

// params is a Vue ref
const { params } = useData();
</script>
<KPerson :slug="params.member" />
