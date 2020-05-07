<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class BaseModel extends Model
{

    protected $keys = [];
    protected $dates = [];
    protected $convert_half_full = [];
    protected $convert_full_half = [];
    protected $convert_katakana_hiragana = [];
    protected $convert_hiragana_katakana = [];

    public function setAttribute($key, $value)
    {
        if(in_array($key, $this->convert_full_half)) {

            $value = mb_convert_kana($value, 'Kas');
        }

        if(in_array($key, $this->convert_half_full)) {

            $value = mb_convert_kana($value, 'KA');
        }

        if(in_array($key, $this->convert_katakana_hiragana)) {

            $value = mb_convert_kana($value, 'Hc');
        }

        if(in_array($key, $this->convert_hiragana_katakana)) {

            $value = mb_convert_kana($value, 'h');
        }


        return parent::setAttribute($key, $value);
    }
}
