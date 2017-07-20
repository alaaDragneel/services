<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UpdateServiceRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:10|max:225',
            'description' => 'required|min:100|max:2000',
            'category_id' => 'required|integer',
            'price' => 'required|integer',
            'image' => 'image|mimes:jpg,jpeg,png|dimensions:min_width=300,min_height=300,max_width=1000,max_height=1000',
        ];
    }
}
