<script async setup>
import { useData } from 'vitepress'
import KTeamMember from '../.vitepress/components/team/KTeamMember.vue';

// params is a Vue ref
const { params } = useData();
</script>
<KTeamMember :slug="params.member" />
