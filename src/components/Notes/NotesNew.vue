<template>
  <form
    class="govuk-form-group"
    @submit.prevent="save"
  >
    <fieldset
      class="govuk-fieldset"
      role="group"
    >
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h2 class="govuk-fieldset__heading">
          {{ isUpdate ? `Update note` : `Add note` }}
        </h2>
      </legend>
      <ErrorSummary :errors="errors" />
      <TextArea
        id="body"
        v-model="body"
        class="govuk-!-margin-top-7"
        label="Note"
        :value="body"
        required
      />
      <button
        class="govuk-button"
      >
        Save and return
      </button>
    </fieldset>
  </form>
</template>

<script>
import TextArea from '@jac-uk/jac-kit/draftComponents/Form/TextareaInput';
import Form from '@jac-uk/jac-kit/draftComponents/Form/Form';
import ErrorSummary from '@jac-uk/jac-kit/draftComponents/Form/ErrorSummary';

export default {
  components: {
    TextArea,
    ErrorSummary,
  },
  extends: Form,
  props: {
    note: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      date: null,
      body: null,
      isUpdate: false,
    };
  },
  async created() {
    this.body = this.note.body;
    this.isUpdate =  this.note.body ? true : false;
  },
  methods: {
    async save() {
      const data = { ...this.note };
      const date = Date.now();
      data.body = this.body;
      if (this.note.id) {
        data.lastUpdated = date;
      } else {
        data.created = date;
      }
      this.validate();
      if (this.isValid()) {
        await this.$store.dispatch('notes/save', { data, id: this.note.id });
        this.$emit('changeAction', null);
      }
    },
  },
};
</script>
