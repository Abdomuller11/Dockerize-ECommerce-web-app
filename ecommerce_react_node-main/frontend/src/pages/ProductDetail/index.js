import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ImageGallery from "react-image-gallery";
import {
  Card,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { fetchProduct } from "../../api";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  // Fetch product data using react-query
  const { data, isLoading, isError } = useQuery(
    ["product", product_id],
    () => fetchProduct(product_id),
    { enabled: !!product_id }  // Only fetch if product_id is available
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading product details.</div>;

  // Find if product is already in the basket
  const findBasketItem = items.find(item => item._id === product_id);

  // Prepare images for ImageGallery; assumes URLs need slicing correction
  const images = data.photos.map(url => ({
    original: url.slice(2, -2),
    thumbnail: url.slice(2, -2) // Assuming you might need thumbnails too
  }));

  return (
    <div>
      <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline">
        <ImageGallery items={images} showThumbnails={false} />

        <Stack spacing={4}>
          <CardBody>
            <Heading size="md">{data.title}</Heading>
            <Text maxWidth="400" py="2">{data.description}</Text>
            <Text color="blue.600" fontSize="2xl">${data.price}</Text>
          </CardBody>

          <CardFooter>
            <Button
              colorScheme={findBasketItem ? "red" : "green"}
              onClick={() => addToBasket(data, findBasketItem)}
            >
              {findBasketItem ? "Remove from Basket" : "Add to Basket"}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default ProductDetail;
