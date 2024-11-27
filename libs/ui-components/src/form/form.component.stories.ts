import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormComponent } from './form.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { FormBuilder } from '@angular/forms';
import { CheckboxComponent } from '../checkbox/checkbox.component';

const meta: Meta<FormComponent> = {
  component: FormComponent,
  title: 'Atoms/Form',
  decorators: [
    moduleMetadata({
      imports: [InputComponent, ButtonComponent, CheckboxComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<FormComponent>;

export const Primary: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup">
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="password" label="Password"></ui-input>
      <ui-button actions>Login</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: [''],
        password: [''],
      }),
    },
  }),
};

export const TwoActions: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup">
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="password" label="Password"></ui-input>
      <ui-button actions>Login</ui-button>
      <ui-button variant="outline" actions>Forgot password</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: [''],
        password: [''],
      }),
    },
  }),
};

export const Loading: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup" loading=true>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="password" label="Password"></ui-input>
      <ui-button actions loading="true">Login</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: [''],
        password: [''],
      }),
    },
  }),
};

export const Simple: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup">
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-button actions>Continue</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: [''],
      }),
    },
  }),
};

export const Error: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup">
      <ui-input formControlName="username" label="Username" hasError="true" errorMessage="Invalid username."></ui-input>
      <ui-button actions [disabled]="true">Continue</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: ['foo'],
      }),
    },
  }),
};

export const Sticky: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup" stickyActions="true">
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-button actions>Continue</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: [''],
      }),
    },
  }),
};

export const FormWithCheckbox: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-form [formGroup]="formGroup">
      <ui-input formControlName="username" label="Username"></ui-input>
      <ui-checkbox>Are you sure?</ui-checkbox>
      <ui-button actions>Continue</ui-button>
    </ui-form>`,
    props: {
      formGroup: new FormBuilder().group({
        username: [''],
      }),
    },
  }),
};
