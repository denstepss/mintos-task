<?php

namespace App\Service;


use App\Constants\ExceptWords;

class FeedService
{
    protected $parsedContent;
    private  $linkFeed = 'https://www.theregister.co.uk/software/headlines.atom';

    public function __construct()
    {
        $this->parsedContent = simplexml_load_string(file_get_contents($this->linkFeed));
    }


    public function getTop10(){

        $wordsTop = [];
        $wordsTop10 = [];
        if(isset($this->parsedContent->entry)) {
            foreach ($this->parsedContent->entry as $post) {
                $currentTitle = mb_strtolower(strip_tags($post->title));
                $currentSummary = mb_strtolower(strip_tags($post->summary));
                preg_match_all('/[a-zA-Z]+/', $currentTitle . ' ' . $currentSummary, $postWords);
                if(isset($postWords[0])){
                    foreach ($postWords[0] as $word){
                        if(!in_array($word,ExceptWords::EXCEPT_WORDS)) {
                            $wordsTop[$word] = isset($wordsTop[$word]) ? $wordsTop[$word] + 1 : 1;
                        }
                    }
                }
            }
        }
        if(!empty($wordsTop)) {
            $i = 0;
            while ($i < 10) {
                $mostWord = array_search(max($wordsTop), $wordsTop);
                $wordsTop10[] = ['word' => $mostWord, 'count' => $wordsTop[$mostWord]];
                unset($wordsTop[$mostWord]);
                $i++;
            }
        }

        return $wordsTop10;
    }

    public function getFeed(){

    }

}