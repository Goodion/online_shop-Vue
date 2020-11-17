import FormInputTemplate from "@/components/FormInputTemplate";

export default {
    name: "FormInput",
    components: {FormInputTemplate},
    props: ['title', 'error', 'placeholder', 'name', 'value'],
    computed: {
        dataValue: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v);
            }
        }
    }
}