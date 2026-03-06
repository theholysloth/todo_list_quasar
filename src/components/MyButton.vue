<template>
    <div>
        <button @click="test">Test</button>
    </div>
</template>

<script>

export default {
  name: 'MyButton',
  methods: {
    test() {
        this.$emit('increment', )
    }
  }
}


</script>