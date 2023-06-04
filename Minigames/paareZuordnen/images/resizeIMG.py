import cv2
import glob

imgArr = []
count = 0

imgArr.append(cv2.imread("Minigames/images/mike-meyers-IJyXoyGmiZY-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/mike-meyers-v8XaVfyo41Q-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/alexander-andrews-m5kv39fdFnQ-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/sunder-muthukumaran-n7eJHQwefeI-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/imani-bahati-ut67iFuoD2o-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/virender-singh-e4zT41x1btw-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/josh-nuttall-xl2piFfdzyA-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/mike-meyers-LcZnOtKtOUc-unsplash.jpg"))
imgArr.append(cv2.imread("Minigames/images/julia-sabiniarz-lsng4VBmCjM-unsplash.jpg"))


for img in imgArr:

    img = cv2.resize(img, (90, 90))
    # cv2.imshow("Title", img)
    cv2.imwrite(f'Minigames/images/image_{count}.png', img)
    count += 1
    print(count)
    print(img.shape)


# cv2.waitKey(0)