import { useForm } from 'react-hook-form';

import "bootstrap/dist/css/bootstrap.css"
// import openai from 'openai';
import { Configuration, OpenAIApi } from 'openai';

import React, { useState } from 'react';

export default function ChatGPT() {
    // console.log(process.env.OPENAI_KEY);


    const [responses, setResponses] = useState([]);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
    });


    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        try {
            const openai = new OpenAIApi(configuration);
            // console.log(openai)
            const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: data.question,
                max_tokens: 2000,
                temperature: 0.9,
            });
            console.log(completion.data.usage);
            // setResponse([...response, completion.data.choices[0].text]);
            setResponses([completion.data.choices[0].text]);
            // setResponses(['wed']);


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
