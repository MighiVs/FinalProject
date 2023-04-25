<template>
<div>
    <p>{{ task.task }}</p>
</div>
</template>

<script setup>
import {defineProps} from 'vue'

const task = defineProps(['task'])

</script>