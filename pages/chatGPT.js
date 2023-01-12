import { useForm } from 'react-hook-form';

import "bootstrap/dist/css/bootstrap.css"
import { Configuration, OpenAIApi } from 'openai';

import React, { useState } from 'react';

export default function ChatGPT() {

    const [responses, setResponses] = useState([]);

    const kingdomkey = process.env.NEXT_PUBLIC_ANALYTICS_ID;

    const configuration = new Configuration({
        apiKey: kingdomkey,
    });


    const { register, handleSubmit } = useForm();

    console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID, 'this is the key')


    const onSubmit = async (data) => {
        try {
            const openai = new OpenAIApi(configuration);
            const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: data.question,
                max_tokens: 2000,
                temperature: 0.9,
            });
            setResponses([completion.data.choices[0].text]);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                {
                    responses.map((responses, index) => (
                        <div key={index}>
                            <p>{responses}</p>
                        </div>
                    ))
                }

            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label htmlFor='question'>question</label>
                    <input
                        // name='question'
                        className='form-control'
                        {...register('question', { required: true })}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}
