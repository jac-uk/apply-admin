<template>
  <div>
    <form @submit.prevent="validateAndSave">
      <h2 class="govuk-heading-l">
        Vacancy Configuration
      </h2>
      <ErrorSummary
        :errors="errors"
        :show-save-button="true"
        @save="save"
      />
      <ol class="govuk-list">
        <li
          v-for="(taskGroup, index) in taskGroups"
          :key="index"
        >
          <CheckboxGroup
            id="`task-group-${index}`"
            :key="index"
            v-model="exercise.configuration.taskGroupSelected"
            :label="`${index + 1}. ${taskGroup.title}`"
            required
          >
            <CheckboxItem
              v-for="(task, taskIndex) in taskGroup.tasks"
              :key="taskIndex"
              :value="task.id"
              selected="selected"
              :label="task.title"
            />
          </CheckboxGroup>
        </li>
      </ol>
      <button class="govuk-button">
        Save
      </button>
      <button
        class="govuk-button govuk-button--secondary govuk-!-margin-left-3"
        @click="btnGoBack"
      >
        Go back
      </button>
    </form>
  </div>
</template>

<script>
import Form from '@jac-uk/jac-kit/draftComponents/Form/Form';
import ErrorSummary from '@jac-uk/jac-kit/draftComponents/Form/ErrorSummary';
import CheckboxGroup from '@jac-uk/jac-kit/draftComponents/Form/CheckboxGroup';
import CheckboxItem from '@jac-uk/jac-kit/draftComponents/Form/CheckboxItem';

export default {
  components: {
    ErrorSummary,
    CheckboxGroup,
    CheckboxItem,
  },
  extends: Form,
  data() {
    const defaults = {
      configuration: {
        taskGroupSelected: null,
      },
    };
    const data = this.$store.getters['exerciseDocument/data']();
    const exercise = { ...defaults, ...data };
    return {
      exercise: exercise,
      taskGroups: [
        {
          title: 'Account profile',
          tasks: [
            { title: 'Personal details', id: 'apply-personal-details' },
            { title: 'Character information', id: 'character-information-review' },
            { title: 'Equality and diversity', id: 'equality-and-diversity-survey' },
          ],
        },
        {
          title: 'Working preferences',
          tasks: [
            { title: 'Set part-time working preferences', id: 'part-time-working-preferences' },
            { title: 'Location preferences', id: 'location-preferences' },
            { title: 'Jurisdiction preferences', id: 'jurisdiction-preferences' },
            { title: 'Additional preferences', id: 'additional-working-preferences' },
            { title: 'Welsh posts', id: 'welsh-posts' },
          ],
        },
        {
          title: 'Qualifications and experience',
          tasks: [
            { title: 'Relevant qualifications', id: 'relevant-qualifications' },
            { title: 'Post-qualification work experience', id: 'post-qualification-work-experience' },
            { title: 'Judicial experience', id: 'judicial-experience' },
            { title: 'Gaps in employment', id: 'employment-gaps' },
            { title: 'Reasonable length of service', id: 'reasonable-length-of-service' },
          ],
        },
        {
          title: 'Assessments',
          tasks: [
            
          ],
        },
        {
          title: 'Additional Information',
          tasks: [
            { title: 'Additional Information', id: 'additional-information' },
          ],
        },
      ],
    };
  },
  computed: {

  },
  methods: {
    btnGoBack() {
      this.$router.push({ name: 'exercise-show-overview' });
    },
    async save(isValid) {
      this.exercise.progress.vacancyConfiguration = isValid ? true : false;
      await this.$store.dispatch('exerciseDocument/save', this.exercise);
      this.$router.push({ name: 'exercise-show-overview' });
    },
  },
};
</script>
