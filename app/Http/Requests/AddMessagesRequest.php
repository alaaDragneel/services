<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class AddMessagesRequest extends Request
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
            'title' => 'required|min:10|max:50',
            'message' => 'required|min:10|max:500',
            'userId' => 'required|integer'
        ];
    }
}
