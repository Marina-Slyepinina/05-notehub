import { createNote } from "../../services/noteService";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
// import * as yup from 'yup';
import css from "./NoteForm.module.css";
import type { newNote } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps{
    onClose: () => void
}
  
const initialValues: newNote = {
    title: "",
    content: "",
    tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const createNoteMutation = useMutation({
        mutationFn: (noteData: newNote) => createNote(noteData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onClose();
            console.log("success added");
        }
    })

    const handleSubmit = (values: newNote, actions: FormikHelpers<newNote>) => {
        createNoteMutation.mutate(values);
        actions.resetForm();
    };

return <Formik initialValues={initialValues} onSubmit={handleSubmit}> 
    <Form className={css.form}>
        <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <Field id="title" type="text" name="title" className={css.input} />
        <ErrorMessage name="title" className={css.error} />
        </div>
    
        <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <Field as="textarea"
            id="content"
            name="content"
            rows="8"
            className={css.textarea}
        />
        <ErrorMessage name="content" className={css.error} />
        </div>
    
        <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage name="tag" className={css.error} />
        </div>
    
        <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
        </button>
        <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending}
        >
            Create note
        </button>
        </div>
    </Form>
</Formik>
}