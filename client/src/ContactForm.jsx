import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

function ContactForm(props) {
    const form = useForm({
      defaultValues: {
        name:'',
      }
      
    });
    const handleSubmit = (values) => {
      const {onSubmit} = props;
      if(onSubmit){
       onSubmit(values.name);
      }
      form.reset();
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='name' label='enter your name Playlist' form={form} />
        <Button type='submit'>Create your NewPlaylist</Button>
      </form>
    </div>
  )
  };
  export default ContactForm;