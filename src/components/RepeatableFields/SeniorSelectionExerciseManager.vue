<template>
  <div>
    <TextField
      :id="`senior_selection_exercise_manager_${index}`"
      v-model="row.name"
      type="email"
      label="Senior selection exercise manager"
      required
    />
    <slot name="removeButton" />
  </div>
</template>

<script>
import TextField from '@jac-uk/jac-kit/draftComponents/Form/TextField';

export default {
  components: {
    TextField,
  },
  props: {
    row: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
};
</script>
