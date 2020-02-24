<?php

namespace App\Controller;

use App\Service\FeedService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


class MainController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(FeedService $feedService)
    {
        return $this->render('main/index.html.twig', ['top10' => $feedService->getTop10(), 'feed' => $feedService->getFeed()]);
    }


}
