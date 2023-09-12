import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export const NewTransactionModal = () => {
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    console.log(data) 
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>
        
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input 
            type="text" 
            placeholder='Descrição' 
            required 
            {...register('description')}
          />
          <input 
            type="number" 
            placeholder='Preço' 
            required 
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type="text" 
            placeholder='Categoria' 
            required 
            {...register('category')}
          />

          <TransactionType>
            <TransactionTypeButton variant="income" value="income" >
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant="outcome" value="outcome" >
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}
