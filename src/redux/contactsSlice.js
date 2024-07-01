import { createSlice, createSelector } from "@reduxjs/toolkit"
import { AddContacts, deleteContacts, fetchContacts } from "./contactsOps";
import { selectTextFilter } from "./filtersSlice";
export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },

    extraReducers: (builder) => 
        builder 
            .addCase(fetchContacts.pending, (state) =>{
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) =>{
                state.items =action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, (state) =>{
                state.error = true;
                state.loading = false;
            })
            .addCase(AddContacts.pending, (state) =>{
                state.loading = true;
            })
            .addCase(AddContacts.fulfilled, (state, action) =>{
                state.items = [action.payload, ...state.items];
                state.loading = false;
            })
            .addCase(AddContacts.rejected, (state)=>{
                state.error = true;
                state.loading = false;
            })
            .addCase(deleteContacts.pending, (state) =>{
                state.loading = true;
            })
            .addCase(deleteContacts.fulfilled, (state, action) => {
                state.items = state.items.filter(item => {
                    return item.id!==action.payload.id});
                state.loading = false
            })
            .addCase(deleteContacts.rejected, (state)=>{
                state.error = true;
                state.loading = false;
            })
})
export const selectContacts = state => state.contacts.items;

export const selectLoading = state => state.contacts.loading;

export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts ,selectTextFilter],
    (contacts, filterValue) => {
      
        return contacts.filter(contact => 
              contact.name.toLowerCase().includes(filterValue.toLowerCase())
              );
    }
)

export default contactsSlice.reducer